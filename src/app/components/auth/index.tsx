import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Button, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
    overflow: "hidden",
    width: "420px",
  },
}));

const ModalImg = styled.img<{ src: string; alt: string }>`
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  const handleUsername = (e: T) => {
    setMemberNick(e.target.value);
  };

  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };

  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };

  const handleSignupRequest = async () => {
    try {
      const isFulfill =
        memberNick && memberPhone !== "" && memberPassword !== "";

      if (!isFulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";

      if (!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  const fieldSx = {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#cccccc",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#1a1a1a",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1a1a1a",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#888888",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#1a1a1a",
    },
  };

  const buttonSx = {
    width: "100%",
    height: "48px",
    borderRadius: "8px",
    marginTop: "8px",
    fontFamily: "Poppins",
    fontSize: "15px",
    fontWeight: 500,
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#333333",
      boxShadow: "none",
    },
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={signupOpen}>
          <Box className={classes.paper}>
            <ModalImg src={"/img/auth.webp"} alt="Cosmetics Store" />
            <Stack sx={{ padding: "32px", alignItems: "center" }}>
              <h2 style={{ margin: 0, marginBottom: "24px" }}>
                Create Account
              </h2>
              <TextField
                sx={{ ...fieldSx, width: "100%" }}
                id="signup-username"
                label="Username"
                variant="outlined"
                onChange={handleUsername}
              />
              <TextField
                sx={{ ...fieldSx, width: "100%", marginTop: "16px" }}
                id="signup-phone"
                label="Phone number"
                variant="outlined"
                onChange={handlePhone}
              />
              <TextField
                sx={{ ...fieldSx, width: "100%", marginTop: "16px" }}
                id="signup-password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Button sx={buttonSx} onClick={handleSignupRequest}>
                Sign Up
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={loginOpen}>
          <Box className={classes.paper}>
            <ModalImg src={"/img/auth.webp"} alt="Cosmetics Store" />
            <Stack sx={{ padding: "32px", alignItems: "center" }}>
              <h2 style={{ margin: 0, marginBottom: "24px" }}>Welcome Back</h2>
              <TextField
                sx={{ ...fieldSx, width: "100%" }}
                id="login-username"
                label="Username"
                variant="outlined"
                onChange={handleUsername}
              />
              <TextField
                sx={{ ...fieldSx, width: "100%", marginTop: "16px" }}
                id="login-password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Button sx={buttonSx} onClick={handleLoginRequest}>
                Login
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
