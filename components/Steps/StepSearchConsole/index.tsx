"use client"
import { useSetup } from "@/contexts/SetupContext"
import { useForm } from "react-hook-form"


type FormData = {
  firstName: string
  lastName: string
}


export default function StepSearchConsole() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const onSubmit = handleSubmit((data) => console.log(data))

  const { state , setState } = useSetup();

  return (
    <form onSubmit={onSubmit}>
      <p className="text-2xl">{JSON.stringify(state)}</p>
      <label>First Name</label>
      <input {...register("firstName")} />
      <label>Last Name</label>
      <input {...register("lastName")} />
      <button
        type="button"
        onClick={() => {
          setValue("lastName", "luo")
        }}
      >
        SetValue
      </button>
    </form>
  )
}