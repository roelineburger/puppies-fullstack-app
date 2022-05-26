import express from 'express';
import cors from 'cors';
import { Request, Response, Application } from 'express';
import { readFile, writeFile } from 'fs/promises';

interface IPuppy {
  name: string;
  id: number;
  breed: string;
  birthDate: string;
}

const app: Application = express();
app.use(cors());
app.use(express.json());

const readFileData = async (filepath: string) => {
  const data = await readFile(filepath);
  const str = data.toString();
  const json = JSON.parse(str);
  return json;
};

const filePath = './data/puppies.json';

app.get('/api/test', (_req: Request, res: Response) => {
  return res
    .status(200)
    .json({ test: 'is working as it should be intial one' });
});

app.get('/api/puppies', async (_req: Request, res: Response) => {
  const json = await readFileData(filePath);
  return res.status(200).json(json);
});

app.get('/api/puppies/:id', async (req: Request, res: Response) => {
  const json = await readFileData(filePath);
  if (!req.params.id) {
    return res.status(404).json({
      message: 'NOT found',
    });
  }
  const puppy = json.find(
    (p: IPuppy) => p.id === Number.parseInt(req.params.id as string),
  );
  if (!puppy) {
    return res.status(404).json({ message: 'No puppy found with ID' });
  }
  return res.status(200).json(puppy);
});

app.post('/api/puppies', async (req: Request, res: Response) => {
  const newPuppy: IPuppy = {
    id: Number.parseInt(req.body.id as string),
    name: req.body.name,
    breed: req.body.breed,
    birthDate: req.body.birthDate,
  };
  const json = await readFileData(filePath);
  json.push(newPuppy);
  await writeFile('./data/puppies.json', JSON.stringify(json));

  res.status(201).json(newPuppy);
});

app.put('/api/puppies/:id', async (req: Request, res: Response) => {
  const json = await readFileData(filePath);

  const puppy = json.find(
    (p: IPuppy) => p.id === Number.parseInt(req.params.id as string),
  );
  if (!puppy) {
    return res.status(404).json({ message: 'No puppy found with ID' });
  }
  puppy.id = Number.parseInt(req.body.id as string);
  puppy.name = req.body.name;
  puppy.breed = req.body.breed;
  puppy.birthDate = req.body.birthDate;

  await writeFile('./data/puppies.json', JSON.stringify(json));
  return res.status(204).json(puppy);
});

app.delete('/api/puppies/:id', async (req: Request, res: Response) => {
  const json = await readFileData(filePath);

  const puppyIndex = json.findIndex(
    (p: IPuppy) => p.id === Number.parseInt(req.params.id as string),
  );
  if (puppyIndex >= 0) {
    json.splice(puppyIndex, 1);
    await writeFile('./data/puppies.json', JSON.stringify(json));
    return res.status(204).json({ message: 'Puppy deleted' });
  }
  return res.status(404).json({ message: 'No puppy found with ID' });
});

export default app;
