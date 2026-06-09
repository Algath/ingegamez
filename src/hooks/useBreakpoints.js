import { useMediaQuery } from 'react-responsive';

export const BP = {
    mobile: 768,
    tablet: 1024,
    desktop: 1440,
    largeDesktop: 1950,
};

export function useBreakpoints() {
    const isMobile = useMediaQuery({ maxWidth: BP.mobile});
    const isTablet = useMediaQuery({ minWidth: BP.mobile + 1, maxWidth: BP.tablet });
    const isDesktop = useMediaQuery({ minWidth: BP.tablet + 1, maxWidth: BP.desktop });
    const isLargeDesktop = useMediaQuery({ minWidth: BP.desktop + 1 });

    const isTouch = useMediaQuery({ maxWidth: BP.tablet });

    return { isMobile, isTablet, isDesktop, isLargeDesktop, isTouch };
}