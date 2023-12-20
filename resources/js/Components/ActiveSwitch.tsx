import { Slide } from "@/types";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import { router } from "@inertiajs/react";


interface ActiveSwitchProps {
  slide: Slide;
}
export default function ActiveSwitch({
  slide
}: ActiveSwitchProps) {
  const [enabled, setEnabled] = useState(Boolean(Number(slide.active)));

  const handleChange = () => {
    setEnabled(!enabled);
    router.patch(route('slides.update', slide.id), {
      active: !Number(slide.active)
    }, {
      preserveScroll: true
    });
  }

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={`${enabled ? 'bg-green-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Active</span>
      <span
        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
