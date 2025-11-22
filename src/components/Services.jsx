import ListComponent from "./ListComponent";
import photo08 from '../assets/photo08.jpg';
import photo09 from '../assets/photo09.jpg';

const data = [
     { imagePath: photo08, text: 'This is the first Service Offered' },
     { imagePath: photo09, text: 'This is the second Service Offered' },
];

function Services(){
    return(
        <div>
            <h3>Services</h3>
            <ListComponent items={data}/>
        </div>
    );
}

export default Services;