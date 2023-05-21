import { useState } from 'react';
import { Button, Menu, MenuItem, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categoriesq } from '../../constants/dataq';

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

const CategoriesQ = () => {
    const [searchParams] = useSearchParams();
    const categoryq = searchParams.get('categoryq');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        
        <>
        <Link to={`/createquestion?categoryq=${categoryq || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Question</StyledButton>
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
                    to={"/qna"}
                    onClick={handleMenuClose}
                >
                    All Categories
                </MenuItem>
                {categoriesq.map((categoryq) => (
                    <MenuItem
                        key={categoryq.id}
                        component={StyledLink}
                        to={`/qna?categoryq=${categoryq.type}`}
                        onClick={handleMenuClose}
                    >
                        {categoryq.type}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default CategoriesQ;
