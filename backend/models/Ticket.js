const mongoose = require('mongoose');

const ticketIterationSchema = new mongoose.Schema({
  id: {
    type: String
  },
  ticketId: {
    type: String
  },
  userEmail: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    trim: true
  },
  statusChange: {
    from: {
      type: String
    },
    to: {
      type: String
    }
  },
  fieldChanges: {
    type: mongoose.Schema.Types.Mixed
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ticketSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  ticketNumber: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'LOW'
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  status: {
    type: String,
    enum: ['NEW', 'IN_PROGRESS', 'DISPATCHED', 'CLOSED', 'CANCELLED'],
    default: 'NEW'
  },
  resolution: {
    type: String,
    trim: true
  },
  createdBy: {
    type: String,
    required: true,
    ref: 'User'
  },
  assignedTo: {
    type: String,
    ref: 'User'
  },
  closedAt: {
    type: Date
  },
  duration: {
    type: Number
  },
  iterations: [ticketIterationSchema]
}, {
  timestamps: true
});

ticketSchema.pre('save', function(next) {
  if (!this.id) {
    this.id = this._id.toString();
  }

  if (!this.ticketNumber) {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
    this.ticketNumber = `${dateStr}-${randomNum}`;
  }

  if (this.isModified('status')) {
    if (this.status === 'CLOSED' || this.status === 'CANCELLED') {
      if (!this.closedAt) {
        this.closedAt = new Date();
      }
      if (this.createdAt && !this.duration) {
        this.duration = Math.floor((this.closedAt - this.createdAt) / (1000 * 60 * 60));
      }
    } else {
      this.closedAt = undefined;
      this.duration = undefined;
    }
  }

  next();
});

module.exports = mongoose.model('Ticket', ticketSchema);