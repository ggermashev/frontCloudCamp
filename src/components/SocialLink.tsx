import React from 'react';
import {Image} from "react-bootstrap";
import "./styles/css/SocialLink.css"


const SocialLink = (props: {title: string}) => {
    return (
        <span className="row-left-flex social-link">
            <Image src={require('../images/folder.png')}/>
            <p>{props.title}</p>
        </span>
    );
};

export default SocialLink;