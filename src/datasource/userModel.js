class UserModel {
    constructor({
        id = null,
        uid = null,
        username = '',
        displayName = '',
        email = '',
        password = '',
        userType = 'USER', // USER or ADMIN
        firstName = '',
        lastName = '',
        // Student-specific fields
        studentId = '',
        // Admin-specific fields
        department = '',
        employeeId = '',
        position = '',
        createdAt = new Date(),
        updatedAt = new Date(),
        isActive = true
    } = {}) {
        this.id = id;
        this.uid = uid;
        this.username = username;
        this.displayName = displayName;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.firstName = firstName;
        this.lastName = lastName;
        // Student fields
        this.studentId = studentId;
        // Admin fields
        this.department = department;
        this.employeeId = employeeId;
        this.position = position;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isActive = isActive;
    }

    // Check if user is admin
    isAdmin() {
        return this.userType === 'ADMIN';
    }

    // Get full name
    getFullName() {
        return `${this.firstName} ${this.lastName}`.trim() || this.displayName || this.username;
    }

    // Check if user can manage tickets
    canManageTickets() {
        return this.userType === 'ADMIN';
    }
}

export default UserModel;