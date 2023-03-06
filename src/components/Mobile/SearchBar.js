import styled from 'styled-components';
import React from 'react';


export default class SearchBar extends React.Component {

    render() {
        return (
            <SearchBarWrap>
            <Header>
                Search Bar
            </Header>

            </SearchBarWrap>

        )
    }
}

// Styles
const SearchBarWrap = styled.section`
    margin: 1vh;
    border: 3px solid red;
    min-height: 6vh;
;`

const Header = styled.header`
    font-size: calc(10px + 2vmin);
    color: white;
`;


