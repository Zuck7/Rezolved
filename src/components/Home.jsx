import Counter from "./counter";
import ControlledComponent from "./counterInput";

function Home(){
    return(
        <div>
            <h3>Welcome to my portfolio</h3>
            <Counter />
            <ControlledComponent />
        </div>
    );
}

export default Home;