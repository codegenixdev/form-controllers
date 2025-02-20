import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  contactNumber: z.string(),
});

type Schema = z.infer<typeof schema>;
const defaultValues: Schema = {
  contactNumber: "",
  email: "",
  fullName: "",
};

const App = () => {
  const form = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        <Input<Schema> name="fullName" />
        <Input<Schema> name="email" />
        <Input<Schema> name="contactNumber" />
        <Button>Submit</Button>
      </FormProvider>
    </form>
  );
};

export { App };
