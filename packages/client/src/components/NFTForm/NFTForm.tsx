import React, { useState } from "react";
import { Spinner } from "@icons";
import { DropArea, OutlineGlowAnimation } from "@components";
import { Input, TextArea } from "@nightfall-ui/inputs";
import { Button } from "@nightfall-ui/buttons";
import { useNFT } from "@hooks";
import { useForm } from "react-hook-form";
import { Flex, useBreakpointStyle } from "@nightfall-ui/layout";

const NftForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [create, { loading, error, data }] = useNFT();
  const onSubmit = async (e: any) => {
    const { files, name, description } = e;
    await create({ file: files[0], name, description });
  };

  const filesRegister = register("files", {
    required: "A file is required.",
  });
  const [animate, setAnimate] = useState(false);

  const dropAreaWidthStyle = useBreakpointStyle({
    small: {
      width: "100%",
    },
    medium: {
      width: "300px",
    },
  });

  return (
    <div>
      {loading && <Spinner />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex justify={"center"}>
          {!loading && !data && (
            <OutlineGlowAnimation
              in={animate}
              timeout={700}
              style={dropAreaWidthStyle}
            >
              <div
                style={{
                  ...dropAreaWidthStyle,
                  borderRadius: " 2rem",
                }}
              >
                <DropArea
                  style={{
                    ...dropAreaWidthStyle,
                    height: "300px",
                  }}
                  accept={".jpg,.png,.jpeg,.txt"}
                  {...filesRegister}
                />
              </div>
            </OutlineGlowAnimation>
          )}
        </Flex>
        <div>
          <OutlineGlowAnimation
            in={animate}
            style={{
              width: "100%",
            }}
          >
            <Input
              style={{
                width: "100%",
              }}
              invalid={!!errors["name"]}
              variant={"outlined"}
              placeholder={"Name"}
              {...register("name", {
                required: "Name is required.",
                maxLength: 200,
              })}
            />
          </OutlineGlowAnimation>
        </div>
        <div>
          <OutlineGlowAnimation
            in={animate}
            timeout={700}
            style={{
              width: "100%",
            }}
          >
            <TextArea
              style={{
                width: "100%",
                resize: "none",
              }}
              invalid={!!errors["description"]}
              placeholder={"Description"}
              {...register("description", {
                required: "Description is required.",
                maxLength: 1000,
              })}
            />
          </OutlineGlowAnimation>
        </div>
        <div>
          <Button size={"large"} type={"submit"}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export { NftForm };
