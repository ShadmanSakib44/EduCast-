import { useState } from 'react';
import { AppBar, Toolbar, styled, Button, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { categories } from '../../constants/data';

const Component = styled(AppBar)`
    // background: #58ab4b;
    background: linear-gradient(180deg, #207531, #40cf61);
    background: #58ab4b;
    color: black;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        color: #000;
        text-transform: uppercase;
        border-radius: 5px;
        text-decoration: none;
        transition: all 0.2s ease-in-out;

        &:hover {
            background-color: #000;
            color: #fff;
        }
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #000;
    &:hover {
        text-decoration: underline;
    }
`;

const Button1 = styled(Button)`
     
        text-decoration: none;
        color: #000;
        &:hover {
            text-decoration: underline;
        }
    
`;
const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button1 variant="contained" onClick={handleMenuOpen} style={{backgroundColor: 'white', fontWeight: 'bold'}}>
    Categories
</Button1>


            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem
                    component={StyledLink}
                    to={"/"}
                    onClick={handleMenuClose}
                >
                    All Categories
                </MenuItem>
                {categories.map((category) => (
                    <MenuItem
                        key={category.id}
                        component={StyledLink}
                        to={`/?category=${category.type}`}
                        onClick={handleMenuClose}
                    >
                        {category.type}
                    </MenuItem>
                ))}
            </Menu>
            <StyledLink to={`/create?category=${category || ''}`}>Create Blog</StyledLink>
        </>
    );
};

const Header = () => {

    const navigate = useNavigate();

    const logout = async () => navigate('/account');
        
    return (
        <Component>
            <Container>
            <Link to='/'>HOME</Link>

                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/account'>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;
