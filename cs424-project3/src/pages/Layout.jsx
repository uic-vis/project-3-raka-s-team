/** @jsxImportSource theme-ui */
import { Outlet, Link } from "react-router-dom";
import { Box, Button, Container, Flex, Grid, Heading, NavLink } from "theme-ui";
// import Map from "./Map";
function Layout({
    data,
    changeData,
    renderMode,
    changeRenderMode,
    chosenData,
    changeChosenData,
    ...props
}) {
    return (
        <Flex
            sx={{
                position: "fixed",
                width: "70%",
                right: "0%",
                flexDirection: "column",

            }}
        >
            {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}

            <Grid
                sx={{
                    position: "relative",
                    zIndex: "6",
                    width: "50vw",
                    padding: 4,
                }}
                columns={[3]}
            >
                <Link to="/BrushMode">
                    <Button>Brush Mode</Button>
                </Link>

                <Link to="/SelectMode">
                    <Button>Select Mode</Button>
                </Link>

                <Link to="/SliderMode">
                    <Button>Slider Mode</Button>
                </Link>
            </Grid>
            <hr />

            {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
            <Container
                sx={{
                    position: "relative",
                    zIndex: "1",
                    width: "63vw",
                    background: "rgba(255, 255, 255, 0.45)",
                    borderRadius: "16px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    padding: 4,
                }}
            >
                <Outlet />
            </Container>
        </Flex>
    );
}

export default Layout;
