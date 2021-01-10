import React, { useState } from "react";

import styled, { css } from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

import "./styles.scss";

const OuterContainer = styled.div`
    margin: 0px auto;
    width: 100%;
    height: 500px;
`;
const CarouselContainer = styled.div`
    position: absolute;
    width: 1000px;
    margin: 100px auto;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 0;
`;

const ArrowIcon = styled.div`
    position: absolute;
    width: 30px;
    height: 30px;
    text-align: center;
    font-size: 25px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    color: #228291;
    line-height: 30px;
    margin-top: 175px;
    z-index: 1000;
    ${props => props.arrowLeft && css`
        left: -40px;
        right: initial;
    `}
    ${props => props.arrowRight && css`
        left: initial;
        right: -40px;
    `}
`;

const Image = styled.img`
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 10px;
`;

const ImageSliderNew = (props) => {
    const [active, setActive] = useState(props.active);
    const [direction, setDirection] = useState('');
    
    const getImages = () => {
        const { slides } = props;
        let items = [];
        let level;
        for (let i = active - 1; i < active + 2; i++) {
            let index = i;
            if (i < 0) {
                index = slides.length + i;
            } else if (i >= slides.length) {
                index = i % slides.length;
            }
            level = active - i;
            items.push(<Item key={index} id={index} imageUrl={slides[index].image} level={level} />)
        }
        return <>{items}</>
    }
    
    const rightClick = () => {
        const { slides } = props;
        let newActive = active;
        newActive--;
        setActive(newActive < 0 ? slides.length - 1 : newActive);
        setDirection('left');
    }
    
    const leftClick = () => {
        const { slides } = props;
        let newActive = active;
        setActive((newActive + 1) % slides.length);
        setDirection('right');
    }
    
    return(
        <OuterContainer>
            <CarouselContainer>
                <ArrowIcon arrowLeft onClick={leftClick}>
                    <FaArrowAltCircleLeft />
                </ArrowIcon>
                <TransitionGroup 
                    transitionName={direction}
                >
                    <CSSTransition 
                        classNames={direction}
                    >
                        {getImages()}
                    </CSSTransition>
                </TransitionGroup>
                <ArrowIcon arrowRight onClick={rightClick}>
                    <FaArrowAltCircleRight />
                </ArrowIcon>
            </CarouselContainer>
        </OuterContainer>
    )
}

const Item = (props) => {
    return(
        <div className={`item level${props.level}`}>
            <Image src={props.imageUrl} />
        </div>
    )
}


export default ImageSliderNew;