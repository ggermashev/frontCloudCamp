import React, {FC} from 'react';
import {Image} from "react-bootstrap";
import "./styles/css/SocialLink.css"
import {Link} from "react-router-dom";

interface ILink {
    title: string,
    link: string,
}

const SocialLink: FC<ILink> = ({title, link}) => {
    return (
        <span className="row-left-flex social-link">
            <Image src={require('../images/folder.png')}/>
            <Link to={link} target={"_blank"}>{title}</Link>
        </span>
    );
};

export default SocialLink;