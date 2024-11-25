import Question from "@/components/mainpage/question.jsx";

const dummy = [
  {
    id: 1,
    title: "질문 제목 1",
    content:
      "질문 내용 1질문 내용 1질문 내용 1질문 내용 1질문 내용 1질문 내용 1질문 내용 1질문 내용 1질문 내용 1질문 내용 1질문 내용 1",
    writer: "작성자 1",
    create_at: "2022-01-01",
    view_cnt: 123123,
  },
  {
    id: 2,
    title: "질문 제목 2",
    content:
      "질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2질문 내용 2",
    writer: "작성자 2",
    create_at: "2022-02-01",
    view_cnt: 321321,
  },
  {
    id: 3,
    title: "질문 제목 3",
    content: "질문 내용 3",
    writer: "작성자 3",
    create_at: "2022-03-01",
    view_cnt: 454545,
  },
];

export default function MainQnA() {
  return (
    <div className="w-1/2 h-[80vh] rounded-2xl shadow-xl border-gray-400 bg-appGrey2 p-6">
      <p className="text-3xl font-bold mb-4">많이 본 QnA</p>
      <div className="flex flex-col h-[90%]">
        <div className="flex flex-col h-full space-y-4 justify-around">
          {dummy.map((question) => (
            <div key={question.id} className="">
              <Question key={question.id} data={question} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
