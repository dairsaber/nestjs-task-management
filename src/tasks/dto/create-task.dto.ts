// 这边用class来承载dto是非常好的选择 不推荐用接口
export class CreateTaskDto {
  title: string;
  description: string;
}
