class UserModel {
    constructor({
        id = null,
        email = '',
        password = '',
        userType = 'USER', // USER or ADMIN
        firstName = '',
        lastName = '',
        // Student-specific fields
        studentId = '',
        // Admin-specific fields
        department = '',
        isActive = true
    } = {}) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.firstName = firstName;
        this.lastName = lastName;
        this.studentId = studentId;
        this.department = department;
        this.isActive = isActive;
    }

    // Check if user is admin
    isAdmin() {
        return this.userType === 'ADMIN';
    }

    // Get full name
    getFullName() {
        return `${this.firstName} ${this.lastName}`.trim() || this.email;
    }

    // Check if user can manage tickets
    canManageTickets() {
        return this.userType === 'ADMIN';
    }
}

export default UserModel;