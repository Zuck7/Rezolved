class TicketModel {
    constructor({
        id = null,
        ticketNumber = null,
        description = '',
        priority = 'LOW',
        customerName = '',
        customerEmail = '',
        status = 'NEW',
        resolution = '',
        createdBy = null,
        assignedTo = null,
        createdAt = new Date(),
        updatedAt = new Date(),
        closedAt = null,
        duration = null,
        iterations = []
    } = {}) {
        this.id = id;
        this.ticketNumber = ticketNumber;
        this.description = description;
        this.priority = priority; // LOW, MEDIUM, HIGH, CRITICAL
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.status = status; // NEW, IN_PROGRESS, DISPATCHED, CLOSED, CANCELLED
        this.resolution = resolution;
        this.createdBy = createdBy;
        this.assignedTo = assignedTo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.closedAt = closedAt;
        this.duration = duration;
        this.iterations = iterations;
    }

    // Generate ticket number based on date: YYYYMMDD-NNNNNNN
    static generateTicketNumber(sequenceNumber) {
        const today = new Date();
        const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
        const seqStr = String(sequenceNumber).padStart(7, '0');
        return `${dateStr}-${seqStr}`;
    }

    // Check if ticket can be modified
    canModify() {
        return this.status !== 'CLOSED' && this.status !== 'CANCELLED';
    }

    // Check if ticket is active
    isActive() {
        return this.status !== 'CLOSED' && this.status !== 'CANCELLED';
    }
}

// Ticket Iteration Model for audit trail
class TicketIteration {
    constructor({
        id = null,
        ticketId = null,
        userEmail = '',
        comment = '',
        statusChange = null,
        fieldChanges = {},
        timestamp = new Date()
    } = {}) {
        this.id = id;
        this.ticketId = ticketId;
        this.userEmail = userEmail;
        this.comment = comment;
        this.statusChange = statusChange; // { from: 'OLD_STATUS', to: 'NEW_STATUS' }
        this.fieldChanges = fieldChanges; // { field: { from: 'old', to: 'new' } }
        this.timestamp = timestamp;
    }
}

export { TicketIteration };
export default TicketModel;
