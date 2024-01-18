# Dynaform - Dynamic Forms

## Description

Dynaform is a library that allows you to create dynamic forms in a simple way. It is based on
the [JSON Schema](https://json-schema.org/) standard. It is written in [Typescript](https://www.typescriptlang.org/) and
can be used in any project that uses this language.

## Installation

```bash
npm install @vin.samdy.dev/dynaform

# or

yarn add @vin.samdy.dev/dynaform
```

## Usage

```typescript
export default function Home() {
  const dynaform = useDynaform([
    {
      type: 'text',
      name: 'username',
      label: 'Username',
      defaultValue: 'Vin Samdy',
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      defaultValue: 'vin.samdy.dev@gmail.com',
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      defaultValue: 'Vs1234567890',
    },
    {
      type: 'number',
      name: 'age',
      label: 'Age',
      defaultValue: 18,
    },
    {
      type: 'autocomplete',
      name: 'gender',
      label: 'Gender',
      defaultValue: {
        label: 'Male',
        value: 'male',
      },
      multiple: false,
      options: [
        {
          label: 'Male',
          value: 'male',
        },
        {
          label: 'Female',
          value: 'female',
        },
      ],
    },
    {
      type: 'autocomplete',
      name: 'skills',
      label: 'Skills',
      defaultValue: [
        {
          label: 'React',
          value: 'react',
        },
        {
          label: 'Vue',
          value: 'vue',
        },
      ],
      multiple: true,
      options: [
        {
          label: 'React',
          value: 'react',
        },
        {
          label: 'Vue',
          value: 'vue',
        },
        {
          label: 'Angular',
          value: 'angular',
        },
      ],
    },
    {
      type: 'checkbox',
      name: 'hobbies',
      label: 'Hobbies',
      defaultValue: [
        {
          label: 'Reading',
          value: 'reading',
        },
        {
          label: 'Writing',
          value: 'writing',
        },
      ],
      options: [
        {
          label: 'Reading',
          value: 'reading',
        },
        {
          label: 'Writing',
          value: 'writing',
        },
        {
          label: 'Coding',
          value: 'coding',
        },
        {
          label: 'Gaming',
          value: 'gaming',
        },
        {
          label: 'Drawing',
          value: 'drawing',
        },
        {
          label: 'Singing',
          value: 'singing',
        },
      ],
    },
    {
      type: 'radio',
      name: 'country',
      label: 'Country',
      defaultValue: {
        label: 'Cambodia',
        value: 'kh',
      },
      options: [
        {
          label: 'Cambodia',
          value: 'kh',
        },
        {
          label: 'Thailand',
          value: 'th',
        },
        {
          label: 'Vietnam',
          value: 'vn',
        },
        {
          label: 'Laos',
          value: 'la',
        },
        {
          label: 'Myanmar',
          value: 'mm',
        },
        {
          label: 'Singapore',
          value: 'sg',
        },
      ],
    },
    {
      type: 'switch',
      name: 'newsletter',
      label: 'Newsletter',
      defaultValue: true,
    },
    {
      type: 'slider',
      name: 'rating',
      label: 'Rating',
      defaultValue: 5,
      max: 10,
      min: 0,
    },
    {
      type: 'date',
      name: 'birthday',
      label: 'Birthday',
      defaultValue: new Date(),
    },
    {
      type: 'time',
      name: 'wakeup',
      label: 'Wakeup',
      defaultValue: new Date(),
    },
    {
      type: 'datetime',
      name: 'meeting',
      label: 'Meeting',
      defaultValue: new Date(),
    },
    {
      type: 'editor',
      name: 'description',
      label: 'Description',
      defaultValue: '<p>Hello World</p>',
    },
  ]);

  const formik = useFormik({
    initialValues: dynaform.formikInitialValues,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const dummyData = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        username: `User ${i}`,
        email: `user${i}@gmail.com`,
        password: `password${i}`,
        age: i,
      })),
    []
  );

  return (
    <FormikProvider value={formik}>
      <Container>
        <Typography variant="h1">Home</Typography>
        <Dynaform formConfig={dynaform.dynaformConfig} />
        <LoadingButton
          variant="contained"
          loading={formik.isSubmitting}
          onClick={formik.submitForm}
          sx={{ mt: 2 }}
        >
          Submit
        </LoadingButton>

        <Dynable
          columns={[
            {
              id: 'username',
              label: 'Username',
            },
            {
              id: 'email',
              label: 'Email',
            },
            {
              id: 'password',
              label: 'Password',
            },
            {
              id: 'age',
              label: 'Age',
            },
          ]}
          data={dummyData}
          actions={(row) => (
            <Stack direction="row" gap={1} justifyContent="flex-end">
              <Button variant="contained" color="primary">
                Edit
              </Button>
              <Button variant="contained" color="error">
                Delete
              </Button>
            </Stack>
          )}
        />
      </Container>
    </FormikProvider>
  );
}

```

## Schema

The schema is based on the [JSON Schema](https://json-schema.org/) standard. You can find more information about
it [here](https://json-schema.org/understanding-json-schema/).

## License

```
MIT License
```

**Free Software, Hell Yeah!**

Copyrigth (c) 2021 [Samdy Vin](github.com/VinSamdyDev)