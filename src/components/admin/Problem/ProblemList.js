import React, { useEffect, useState } from "react";
import { Table, Pagination, Col } from "react-bootstrap";
import { GetProblems } from "../../../service/apiproduct";

function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [problemsPerPage] = useState(5);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    const problemData = await GetProblems();
    setProblems(problemData);
  };

  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = problems.slice(
    indexOfFirstProblem,
    indexOfLastProblem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-4 content">
      <h2 className="text-center mb-4">Problem List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Problem</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentProblems.map((problem) => (
            <tr key={problem.id}>
              <td>{problem.id}</td>
              <td>{problem.email}</td>
              <td>{problem.username}</td>
              <td>{problem.problem}</td>
              <td>{problem.status ? "Resolved" : "Unresolved"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Col className="d-flex justify-content-center">
        <Pagination>
          {Array.from(
            { length: Math.ceil(problems.length / problemsPerPage) },
            (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </Col>
    </div>
  );
}

export default ProblemList;
