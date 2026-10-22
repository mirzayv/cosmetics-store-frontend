import React from "react";
import { Box, Container, Stack, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";
import MessageService from "../../services/MessageService";
import { MessageInput } from "../../../lib/types/message";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";

export default function HelpPage() {
  const [value, setValue] = React.useState("1");

  /** HANDLERS **/

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    try {
      const formData = new FormData(form);
      const input: MessageInput = {
        memberNick: String(formData.get("memberNick")),
        memberEmail: String(formData.get("memberEmail")),
        memberMsg: String(formData.get("memberMsg")),
      };

      const messageService = new MessageService();
      await messageService.createMessage(input);

      await sweetTopSuccessAlert("Your message has been sent.", 1500);
      form.reset();
    } catch (err) {
      console.log("Error, handleContactSubmit:", err);
      await sweetErrorHandling(err);
    }
  };

  return (
    <div className={"help-page"}>
      <Container className={"help-container"}>
        <TabContext value={value}>
          <Box className={"help-menu"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="lab API tabs example"
                className={"table_list"}
              >
                <Tab label="TERMS" value={"1"} />
                <Tab label="FAQ" value={"2"} />
                <Tab label="CONTACT" value={"3"} />
              </Tabs>
            </Box>
          </Box>
          <Stack>
            <Stack className={"help-main-content"}>
              <TabPanel value={"0"}>
                <Stack className={"about-box"}>
                  <span className={"about-title"}>About Cosmetics Store</span>
                  <p>
                    Cosmetics Store was founded on a simple idea: quality
                    skincare and beauty products shouldn&apos;t be complicated
                    to find or expensive to enjoy. We curate a hand-picked
                    selection of skincare, makeup, haircare, and fragrance from
                    trusted formulators, so every product on our shelves has
                    already earned its place through real results.
                  </p>
                  <p>
                    Our team combines a passion for clean, effective beauty with
                    a commitment to honest information — clear ingredient lists,
                    transparent pricing, and no filler claims. Whether
                    you&apos;re building a daily skincare routine or looking for
                    your next signature scent, we&apos;re here to make the
                    experience simple, personal, and enjoyable.
                  </p>
                  <p>
                    We&apos;re a growing community of beauty lovers who believe
                    good skin days start with good choices. Thank you for
                    shopping with us — we&apos;re glad you&apos;re here.
                  </p>
                </Stack>
              </TabPanel>
              <TabPanel value={"1"}>
                <Stack className={"rules-box"}>
                  <Box className={"rules-frame"}>
                    {terms.map((value, number) => {
                      return <p key={number}>{value}</p>;
                    })}
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel value={"2"}>
                <Stack className={"accordion-menu"}>
                  {faq.map((value, number) => {
                    return (
                      <Accordion key={number}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{value.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{value.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value={"3"}>
                <Stack className={"admin-letter-box"}>
                  <Stack className={"admin-letter-container"}>
                    <Box className={"admin-letter-frame"}>
                      <span>Contact us!</span>
                      <p>Fill out below form to send a message!</p>
                    </Box>
                    <form
                      className={"admin-letter-frame"}
                      onSubmit={handleContactSubmit}
                    >
                      <div className={"admin-input-box"}>
                        <label>Your name</label>
                        <input
                          type={"text"}
                          name={"memberNick"}
                          placeholder={"Type your name here"}
                          required
                        />
                      </div>
                      <div className={"admin-input-box"}>
                        <label>Your email</label>
                        <input
                          type={"email"}
                          name={"memberEmail"}
                          placeholder={"Type your email here"}
                          required
                        />
                      </div>
                      <div className={"admin-input-box"}>
                        <label>Message</label>
                        <textarea
                          name={"memberMsg"}
                          placeholder={"Your message"}
                          required
                        ></textarea>
                      </div>
                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        sx={{ mt: "30px" }}
                      >
                        <Button type={"submit"} variant="contained">
                          Send
                        </Button>
                      </Box>
                    </form>
                  </Stack>
                </Stack>
              </TabPanel>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
