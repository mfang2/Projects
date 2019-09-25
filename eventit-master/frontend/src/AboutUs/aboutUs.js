import React, { Component } from 'react';
import './aboutUs.css';
import Conor from '../images/conor.jpg'
import Shreesh from '../images/shreesh.jpg'
import Krutarth from '../images/krutarth.jpg'
import Tianyi from '../images/tianyi.jpeg'
import Michael from '../images/michael.jpg'
class AboutUs extends Component {
    render() {
        return (
            <div id="about-us" >
                <div id="team">
                    <div className="clear1">Event.it</div>
                    <div id="statements" className="clear">
                        <p>This project is the perfect example of completing a 4 week project in 3 days</p>

                    </div>
                    <div id="statements" className="clear2">
                        Presented with <i class="fas fa-heart"></i> by --
                    </div>
                    <div className="member">
                        <div className="imagediv">
                            <img src={Shreesh} alt="Shreesh Chavan" className="memberimage"></img>
                        </div>
                        <div className="infoContainer">
                            <div className="memberName">
                                Shreesh Chavan
                        </div>
                            <div className="gitLink">
                                <a href="https://github.com/sheeryachavan/" className="gitLinkInner"><i class="fab fa-github"></i>
                                    sheeryachavan
                            </a>

                            </div>
                        </div>

                    </div>
                    <div className="member">
                        <div className="imagediv">
                            <img src={Michael} alt="Michael Fang" className="memberimage"></img>
                        </div>
                        <div className="infoContainer">
                            <div className="memberName">
                                Michael Fang
                        </div>
                            <div className="gitLink">
                                <a href="https://github.com/mfang2/" className="gitLinkInner"><i class="fab fa-github"></i>
                                    mfang2
                            </a>

                            </div>
                        </div>

                    </div>
                    <div className="member">
                        <div className="imagediv">
                            <img src={Conor} alt="Conor Manning" className="memberimage"></img>
                        </div>
                        <div className="infoContainer">
                            <div className="memberName">
                                Conor Manning
                        </div>
                            <div className="gitLink">
                                <a href="https://github.com/cmanning96/" className="gitLinkInner"><i class="fab fa-github"></i>
                                    cmanning96
                            </a>

                            </div>
                        </div>

                    </div>
                    <div className="member">
                        <div className="imagediv">
                            <img src={Krutarth} alt="Krutarth Trivedi" className="memberimage"></img>
                        </div>
                        <div className="infoContainer">
                            <div className="memberName">
                                Krutarth Trivedi
                        </div>
                            <div className="gitLink">
                                <a href="https://github.com/Krutarth29/" className="gitLinkInner"><i class="fab fa-github"></i>
                                    Krutarth29
                            </a>

                            </div>
                        </div>

                    </div>
                    <div className="member">
                        <div className="imagediv">
                            <img src={Tianyi} alt="Tianyi Wang" className="memberimage"></img>
                        </div>
                        <div className="infoContainer">
                            <div className="memberName">
                                Tianyi Wang
                        </div>
                            <div className="gitLink">
                                <a href="https://github.com/eternalPangaea/" className="gitLinkInner"><i class="fab fa-github"></i>
                                    eternalPangaea
                            </a>

                            </div>
                        </div>

                    </div>
                </div>

            </div>)
    }
}
export default AboutUs;