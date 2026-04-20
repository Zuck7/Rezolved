const Ticket = require('../models/Ticket');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const getAllTickets = async (req, res) => {
  try {
    const { showClosed } = req.query;
    const user = req.user;

    let filter = {};

    if (user.userType === 'USER') {
      filter.createdBy = user.id;
    }

    if (showClosed === 'false') {
      filter.status = { $nin: ['CLOSED', 'CANCELLED'] };
    }

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: tickets
    });
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tickets',
      error: error.message
    });
  }
};

const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const ticket = await Ticket.findOne({ id });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    if (user.userType === 'USER' && ticket.createdBy !== user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own tickets.'
      });
    }

    res.json({
      success: true,
      ticket: ticket
    });
  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching ticket',
      error: error.message
    });
  }
};

const createTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { description, priority = 'LOW', customerName, customerEmail } = req.body;
    const user = req.user;

    const ticketData = {
      description,
      priority,
      customerName,
      customerEmail,
      createdBy: user.id,
      iterations: [{
        userEmail: user.email,
        comment: 'Ticket created',
        statusChange: {
          from: null,
          to: 'NEW'
        },
        timestamp: new Date()
      }]
    };

    const ticket = await Ticket.create(ticketData);

    res.status(201).json({
      success: true,
      message: 'Ticket created successfully',
      data: ticket
    });
  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating ticket',
      error: error.message
    });
  }
};

const updateTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const user = req.user;
    const { description, priority, customerName, customerEmail, status, assignedTo, resolution } = req.body;

    const ticket = await Ticket.findOne({ id });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    if (user.userType === 'USER' && ticket.createdBy !== user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only edit your own tickets.'
      });
    }

    if (user.userType === 'USER' && (ticket.status === 'CLOSED' || ticket.status === 'CANCELLED')) {
      return res.status(403).json({
        success: false,
        message: 'Cannot edit closed or cancelled tickets.'
      });
    }

    const oldStatus = ticket.status;
    const changes = {};

    if (description !== undefined && description !== ticket.description) {
      ticket.description = description;
      changes.description = { from: ticket.description, to: description };
    }

    if (priority !== undefined && priority !== ticket.priority) {
      changes.priority = { from: ticket.priority, to: priority };
      ticket.priority = priority;
    }

    if (customerName !== undefined && customerName !== ticket.customerName) {
      changes.customerName = { from: ticket.customerName, to: customerName };
      ticket.customerName = customerName;
    }

    if (customerEmail !== undefined && customerEmail !== ticket.customerEmail) {
      changes.customerEmail = { from: ticket.customerEmail, to: customerEmail };
      ticket.customerEmail = customerEmail;
    }

    if (user.userType === 'ADMIN') {
      if (status !== undefined && status !== ticket.status) {
        changes.status = { from: ticket.status, to: status };
        ticket.status = status;
      }

      if (assignedTo !== undefined && assignedTo !== ticket.assignedTo) {
        changes.assignedTo = { from: ticket.assignedTo, to: assignedTo };
        ticket.assignedTo = assignedTo;
      }

      if (resolution !== undefined && resolution !== ticket.resolution) {
        changes.resolution = { from: ticket.resolution, to: resolution };
        ticket.resolution = resolution;
      }
    }

    if (Object.keys(changes).length > 0) {
      ticket.iterations.push({
        userEmail: user.email,
        comment: 'Ticket updated',
        statusChange: {
          from: oldStatus,
          to: ticket.status
        },
        fieldChanges: changes,
        timestamp: new Date()
      });
    }

    await ticket.save();

    res.json({
      success: true,
      message: 'Ticket updated successfully',
      data: ticket
    });
  } catch (error) {
    console.error('Update ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating ticket',
      error: error.message
    });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const ticket = await Ticket.findOne({ id });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    if (user.userType === 'USER' && ticket.createdBy !== user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only delete your own tickets.'
      });
    }

    if (ticket.status !== 'NEW') {
      return res.status(400).json({
        success: false,
        message: 'Only new tickets can be deleted.'
      });
    }

    await Ticket.deleteOne({ id });

    res.json({
      success: true,
      message: 'Ticket deleted successfully'
    });
  } catch (error) {
    console.error('Delete ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting ticket',
      error: error.message
    });
  }
};

const cancelTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const ticket = await Ticket.findOne({ id });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    if (user.userType === 'USER' && ticket.createdBy !== user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only cancel your own tickets.'
      });
    }

    if (ticket.status === 'CLOSED' || ticket.status === 'CANCELLED') {
      return res.status(400).json({
        success: false,
        message: 'Ticket is already closed or cancelled.'
      });
    }

    const oldStatus = ticket.status;
    ticket.status = 'CANCELLED';

    ticket.iterations.push({
      userEmail: user.email,
      comment: 'Ticket cancelled',
      statusChange: {
        from: oldStatus,
        to: 'CANCELLED'
      },
      timestamp: new Date()
    });

    await ticket.save();

    res.json({
      success: true,
      message: 'Ticket cancelled successfully',
      data: ticket
    });
  } catch (error) {
    console.error('Cancel ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling ticket',
      error: error.message
    });
  }
};

const restoreTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (user.userType !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can restore tickets.'
      });
    }

    const ticket = await Ticket.findOne({ id });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    if (ticket.status !== 'CANCELLED') {
      return res.status(400).json({
        success: false,
        message: 'Only cancelled tickets can be restored.'
      });
    }

    const oldStatus = ticket.status;
    ticket.status = 'NEW';

    ticket.iterations.push({
      userEmail: user.email,
      comment: 'Ticket restored',
      statusChange: {
        from: oldStatus,
        to: 'NEW'
      },
      timestamp: new Date()
    });

    await ticket.save();

    res.json({
      success: true,
      message: 'Ticket restored successfully',
      data: ticket
    });
  } catch (error) {
    console.error('Restore ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while restoring ticket',
      error: error.message
    });
  }
};

const updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const { status, comment, userEmail, resolution } = req.body;

    const ticket = await Ticket.findOne({ id });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    // Only admins can update ticket status
    if (user.userType !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only admins can update ticket status.'
      });
    }

    const oldStatus = ticket.status;

    // Update ticket status
    if (status && status !== ticket.status) {
      ticket.status = status;
    }

    // Update resolution if provided
    if (resolution !== undefined) {
      ticket.resolution = resolution;
    }

    // Add iteration for status change
    if (status && status !== oldStatus) {
      ticket.iterations.push({
        userEmail: userEmail || user.email,
        comment: comment || `Status changed from ${oldStatus} to ${status}`,
        statusChange: {
          from: oldStatus,
          to: status
        },
        timestamp: new Date()
      });
    }

    await ticket.save();

    res.json({
      success: true,
      message: 'Ticket status updated successfully',
      data: ticket
    });
  } catch (error) {
    console.error('Update ticket status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating ticket status',
      error: error.message
    });
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  cancelTicket,
  restoreTicket,
  updateTicketStatus
};