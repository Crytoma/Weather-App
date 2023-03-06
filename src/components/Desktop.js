import styled from 'styled-components';
import React from 'react';



export default function Desktop() {
        return (
            <DesktopWrap>
                <Header>
                    Sorry, but we currently only support mobile access. <br/>Please make sure you do not have viewing as a desktop enabled.
                </Header>
            </DesktopWrap>

        )
}


const DesktopWrap = styled.section`
    background-image:linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("https://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/6/2017/11/04133712/waterfall.jpg");
`;

const Header = styled.header`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    text-shadow: 1px 1px 2px black;
    
`;



