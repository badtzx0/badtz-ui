import * as React from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

interface LoginEmailProps {
  loginLink: string
}

export const LoginEmail = ({ loginLink }: LoginEmailProps) => {
  const previewText = `Sign in to BadtzUI`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] px-[36px] py-[8px]">
            <Section className="mt-[32px]">
              <Img
                src="https://cdn.badtz-ui.com/mail-assets/bui-logo.png"
                width="30"
                height="30"
                alt="Badtz"
                className="my-0 mr-auto"
              />
            </Section>
            <Heading
              style={h1}
              className="mx-0 mt-[25px] mb-[15px] p-0 text-[24px] font-normal text-black"
            >
              Sign In
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Click the button below to <strong>Sign In</strong> to your BadtzUI
              account using a magic link.
            </Text>
            <Section className="mt-[32px] mb-[32px]">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={loginLink}
              >
                Sign In
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  padding: "0",
}

export default LoginEmail
