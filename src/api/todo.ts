// import backendAPI from "@/plugins/axios/backendAPI";

export const createTodo = async (params: any) => {
  const response = Object.assign({
    title: params.title,
    description: params.description,
  });
  return response;
};

export const getTodoList = async () => {
  return { data: [] };
};

export const updateTodo = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const response = Object.assign({
    title: title,
    description: description,
  });

  return response;
};

export const deleteTodo = async (title: string) => {
  if (!title) {
    return { response: false };
  }

  return { response: true };
};
