class EventModel {
    constructor(id, name, date, location, description, priority = 'Low', organizer = '', organizerEmail = ''){
        this.id = id;
        this.name = name;
        this.date = date;
        this.location = location;
        this.description = description;
        this.priority = priority;
        this.organizer = organizer;
        this.organizerEmail = organizerEmail;
    }
}

export default EventModel;