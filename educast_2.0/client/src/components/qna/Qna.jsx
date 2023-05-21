import { Grid } from '@mui/material';

//components
import Banner from '../banner/Banner';
import CategoriesQ from './CategoriesQ';
import Questions from '../home/qna/Questions';

const Qna = () => {

    return (
        <>
            <Banner />
            <Grid container>
                <Grid item lg={2} xs={12} sm={2}>
                    <CategoriesQ />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Questions />
                </Grid>
            </Grid>
        </>
    )
}

export default Qna;