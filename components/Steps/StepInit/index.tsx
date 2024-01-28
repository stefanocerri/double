"use client"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { translationClient } from "@/utilities/i18n";
import { useSetup } from "@/contexts/SetupContext";
import { useRouter } from 'next/navigation'
import { Separator } from "@/components/ui/separator"

type FormData = {
  projectName: string
}

export default function StepInit() {
  const { t } = translationClient("it")
  const { state , setState } = useSetup();
  const router = useRouter()

  const saveData = (data: { [key: string]: any }) => {
    setState({ ...state, ...data });
    console.log(data ,'data')
    router.push("/setup/search-console");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const onSubmit = handleSubmit(saveData)
  //const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <div className="mt-6 lg:mt-24">
      <h2 className="text-3xl">Il mio progetto</h2>
      <Separator className="my-6 h-[2px] bg-gray-300"/>
      <p className="text-lg text-gray-500 lg:text-xl mb-6 lg:mb-12">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
      <form className="flex flex-col gap-3 max-w-md" onSubmit={onSubmit}>
        <label>Inserisci un nome al progetto</label>
        <input {...register("projectName")} />
        <Button className="w-24" type="submit">
          {t('steps.nextStep')}
        </Button>
      </form>
    </div>
  )
}