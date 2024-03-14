import Hero from "./Components/Hero/Hero";
import Programs from "./Components/Programs/Programs";
import Navbar from "./Components/Navbar/Navbar";
import Contact from "./Components/Contact/Contact";
import Introduction from "./Components/Introduction/Introduction";
import "./InfoPage.css";
function InfoPage() {
    return (
        <div className="component">
            <Navbar/>
            <Hero />
            <Introduction />
            <Programs details="Join now"/>
            <Contact />
        </div>
    )
}
export default InfoPage;