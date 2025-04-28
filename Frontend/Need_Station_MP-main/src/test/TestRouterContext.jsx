import { useLocation } from 'react-router-dom';

const TestRouterContext = () => {
  const location = useLocation();
  console.log("TestRouterContext location:", location);

  return null;
};

export default TestRouterContext;
