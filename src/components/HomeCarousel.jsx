import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import styles from '../pages/home.module.css';

function GalleryItem({ item }) {
    return (
        <Paper elevation={0} className={styles.carouselItem}>
            <img src={item.src} alt={item.caption} className={styles.carouselImage} />
        </Paper>
    );
}

// chargé à la demande depuis home.jsx : MUI + le carrousel restent hors du bundle principal
export default function HomeCarousel({ images }) {
    return (
        <Carousel>
            {images.map((img) => (
                <GalleryItem key={img.id} item={{ src: img.url, caption: img.alt || img.category }} />
            ))}
        </Carousel>
    );
}
