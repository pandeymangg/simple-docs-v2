import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/utils/api";
import { CREATE_DOC_FORM_MODAL_ID } from "@/lib/constants";

const formSchema = z.object({
  title: z.string().min(1).max(100),
});

type FormSchema = z.infer<typeof formSchema>;

const CreateDocForm = () => {
  const { register, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Untitled",
    },
  });

  const { mutate: createDoc } = api.doc.create.useMutation();
  const utils = api.useContext();

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    createDoc(
      {
        title: data.title,
      },
      {
        onSuccess: () => {
          void utils.doc.getAll.invalidate();
        },
      }
    );
  };

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="checkbox"
        id={CREATE_DOC_FORM_MODAL_ID}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative bg-cpMantle">
          <label
            htmlFor={CREATE_DOC_FORM_MODAL_ID}
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Create a new document</h3>
          <p className="py-4">Enter a title for your new document.</p>

          <div className="flex flex-col gap-4">
            <input className="input bg-cpSurface0" {...register("title")} />

            <button type="submit" className="btn-primary btn w-fit">
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateDocForm;
