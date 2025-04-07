'use client';

import { useForm, Controller } from 'react-hook-form';
import React, { useRef } from 'react';

type CodeForm = {
  code: string[];
};

const ResetCodeForm = () => {
  const { control, handleSubmit, setValue, getValues } = useForm<CodeForm>({
    defaultValues: {
      code: Array(5).fill(''),
    },
  });

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const onSubmit = (data: CodeForm) => {
    const fullCode = data.code.join('');
    console.log('Submitted code:', fullCode);
    // Handle API call here
  };

  const handleChange = (
    index: number,
    value: string
  ) => {
    if (/^[0-9]$/.test(value)) {
      setValue(`code.${index}`, value);
      if (index < 4) {
        inputsRef.current[index + 1]?.focus();
      }
    } else if (value === '') {
      setValue(`code.${index}`, '');
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && getValues(`code.${index}`) === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-center space-x-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Controller
            key={i}
            control={control}
            name={`code.${i}`}
            render={({ field }) => (
              <input
                {...field}
                ref={(el) => {
                  field.ref(el);
                  inputsRef.current[i] = el;
                }}
                type="text"
                maxLength={1}
                inputMode="numeric"
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
              />
            )}
          />
        ))}
      </div>
    </form>
  );
};

export default ResetCodeForm;
