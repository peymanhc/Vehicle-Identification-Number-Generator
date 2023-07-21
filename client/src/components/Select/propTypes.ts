interface Option {
  name: string;
  value: string;
}
interface SelectTypes {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  data: Option[];
  name: string;
}
