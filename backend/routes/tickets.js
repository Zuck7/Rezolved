const express = require('express');
const { body } = require('express-validator');
const { authenticate, authorize } = require('../middleware/auth');
const {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  cancelTicket,
  restoreTicket,
  updateTicketStatus
} = require('../controllers/ticketController');

const router = express.Router();

router.get('/', authenticate, getAllTickets);

router.get('/:id', authenticate, getTicketById);

router.post('/',
  authenticate,
  [
    body('description')
      .isLength({ min: 10, max: 1000 })
      .withMessage('Description must be between 10 and 1000 characters')
      .trim(),
    body('priority')
      .optional()
      .isIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
      .withMessage('Priority must be LOW, MEDIUM, HIGH, or CRITICAL'),
    body('customerName')
      .isLength({ min: 1, max: 100 })
      .withMessage('Customer name is required and must be less than 100 characters')
      .trim(),
    body('customerEmail')
      .isEmail()
      .withMessage('Please provide a valid customer email')
      .normalizeEmail()
  ],
  createTicket
);

router.put('/:id',
  authenticate,
  [
    body('description')
      .optional()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Description must be between 10 and 1000 characters')
      .trim(),
    body('priority')
      .optional()
      .isIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
      .withMessage('Priority must be LOW, MEDIUM, HIGH, or CRITICAL'),
    body('customerName')
      .optional()
      .isLength({ min: 1, max: 100 })
      .withMessage('Customer name must be less than 100 characters')
      .trim(),
    body('customerEmail')
      .optional()
      .isEmail()
      .withMessage('Please provide a valid customer email')
      .normalizeEmail(),
    body('status')
      .optional()
      .isIn(['NEW', 'IN_PROGRESS', 'DISPATCHED', 'CLOSED', 'CANCELLED'])
      .withMessage('Invalid status'),
    body('resolution')
      .optional()
      .trim()
  ],
  updateTicket
);

router.delete('/:id', authenticate, deleteTicket);

router.put('/:id/cancel', authenticate, cancelTicket);

router.put('/:id/restore', authenticate, authorize('ADMIN'), restoreTicket);

router.put('/:id/status', authenticate, authorize('ADMIN'), [
  body('status')
    .optional()
    .isIn(['NEW', 'IN_PROGRESS', 'DISPATCHED', 'CLOSED', 'CANCELLED'])
    .withMessage('Invalid status'),
  body('comment')
    .optional()
    .trim(),
  body('userEmail')
    .optional()
    .isEmail()
    .withMessage('Invalid email format'),
  body('resolution')
    .optional()
    .trim()
], updateTicketStatus);

module.exports = router;