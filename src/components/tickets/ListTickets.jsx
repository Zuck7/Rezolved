import React, { useEffect, useState } from 'react';
import { list } from '../../datasource/api-tickets';
import ListTicketItem from './ListTicketItem';
import { Link } from 'react-router-dom';

const ListTickets = () => {
    const [ticketList, setTicketList] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    const loadTicket = () => {
        list().then((data) => {
            if (data) {
                setTicketList(data || []);

                setIsLoading(false);
            }
        }).catch(err => {
            alert(err.message);
            console.log(err);
        });
    }

    // When the component loads.
    useEffect(() => {
        loadTicket();
    }, []);

    // When a item is removed.
    const handleRemove = () => {
        loadTicket();
    }

    return (
        <>
            <div>
                <Link to="/ticket/add" className="btn btn-primary align-self-end" role="button">
                    <i className="fas fa-plus-circle"></i>
                    Create a Ticket
                </Link>
            </div>
            <div className="table-responsive" >
                {isLoading && <div>Loading...</div>}
                {!isLoading &&
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            {/* -- Header Row-- */}
                            <tr>
                                <th className="text-center">Item</th>
                                <th className="text-center">Qty</th>
                                <th className="text-center">Status</th>
                                <th>Size</th>
                                <th className="text-center">Tags</th>
                                <th className="text-center" colSpan="3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* -- Repeatable Template Row -- */}
                            {ticketList.map(ticket =>
                                <ListTicketItem
                                    key={ticket.id}
                                    ticket={ticket}
                                    onRemoved={handleRemove}
                                />
                            )}
                        </tbody>
                    </table>}
            </div>
        </>
    )
}

export default ListTickets;