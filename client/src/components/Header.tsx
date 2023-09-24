import * as React from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import BiotechIcon from '@mui/icons-material/Biotech';
import MenuIcon from "@mui/icons-material/Menu";
import { darkTheme } from "./style/darkTheme";
import { logoutAuthorization } from "../repositories/auth_repository";

const pages: { [key: string]: string } = {
  Diagnóstico: "/diagnostic",
};
const settings = ["Logout"];

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logoutAuthorization();
    window.location.href = "/login";
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <BiotechIcon sx={{ display: { xs: "none", md: "flex" }, mr: 2 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/diagnostic"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 200,
                letterSpacing: ".01rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: 15,
              }}
            >
              Inteligência Médica
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {Object.keys(pages).map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link
                      to={pages[page]}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <BiotechIcon sx={{ display: { xs: "flex", md: "none" }, mr: 2 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/admin"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                fontFamily: "monospace",
                fontWeight: 200,
                letterSpacing: ".01rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: 15,
              }}
            >
              Administration
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {Object.entries(pages).map(([page, path]) => (
                <Link key={page} to={path} style={{ textDecoration: "none" }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography onClick={handleLogout} textAlign="center">
                    {settings}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
