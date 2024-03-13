import Hero from "./Components/Hero/Hero";
import Programs from "./Components/Programs/Programs";
import Navbar from "./Components/Navbar/Navbar";
import Contact from "./Components/Contact/Contact";
import "./InfoPage.css";
function InfoPage() {
    return (
        <div className="component">
            <Navbar/>
            <Hero />
            <Programs />
            <Contact />
        </div>
    )
}
export default InfoPage;