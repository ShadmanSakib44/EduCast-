import { useState } from 'react';
import { Button, Menu, MenuItem, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categories } from '../../constants/data';

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #58ab4b;
    color: #000;
    text-decoration: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #000;
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
        {/* <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>
            <StyledButton variant="contained" onClick={handleMenuOpen}>
                Categories
            </StyledButton>
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
            </Menu> */}
        </>
    );
};

export default Categories;
