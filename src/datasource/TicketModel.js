class TicketModel {
    constructor(id, name, priority, desc, user, email) {
        this.id = id;
        this.name = name;
        this.priority = priority;
        this.desc = desc;
        this.user = user;
        this.email = email;
    }
}

export default TicketModel;
