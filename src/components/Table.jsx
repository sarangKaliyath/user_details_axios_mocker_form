import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form } from "./Form";
import { ShowTable } from "./ShowTable";
import styled from "styled-components";
// import {HandleFilter} from './HandleFilter';

export function Table() {
  const baseURL = "http://localhost:3001/user";
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const getData = async () => {
    let res = await axios.get(baseURL, {
      params: {
        _page: page,
        _limit: 5,
      },
    });
    setData(res.data);

    console.log(data);
  };

  useEffect(() => {
    getData();
  }, [page]);

  const Input = styled.div`
    border: 1px solid black;
    width: 100vw;
    height: 10vh;
    margin-bottom: 10px;
  `;

  const ButtonsDiv = styled.div`
    border: 1px solid black;
    width: 100vw;
    height: 10vh;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  `;

  const handleFilter = async (value) => {
    await axios.get(baseURL).then(({ data }) => {
      let temp = data.filter((el) => {
        return el.department === value;
      });
      setData(temp);
    });
  };

  const showAll = () => {
    getData();
  };

  const handleHtoL = async () => {
    await axios.get(baseURL).then(({ data }) => {
      let temp = data.sort((a, b) => {
        return b.salary - a.salary;
      });

      setData(temp);
    });
  };

  const handleLtoH = async () => {
    await axios.get(baseURL).then(({ data }) => {
      let temp = data.sort((a, b) => {
        return a.salary - b.salary;
      });

      setData(temp);
    });
  }

  return (
    <div>
      <Input>
        <Form
          data={data}
          setData={setData}
          baseURL={baseURL}
          getData={getData}
        ></Form>
      </Input>
      <ButtonsDiv>
        <div>
          <div>Department</div>
          <button
            onClick={() => {
              handleFilter("A");
            }}
          >
            A
          </button>
          <button
            onClick={() => {
              handleFilter("B");
            }}
          >
            B
          </button>
          <button
            onClick={() => {
              handleFilter("C");
            }}
          >
            C
          </button>
          <button onClick={showAll}>Show All</button>
        </div>
        <div>
          <div>Salary</div>
          <button onClick={handleHtoL}>High to Low</button>
          <button onClick={handleLtoH}>Low to High</button>
        </div>
      </ButtonsDiv>
      <ShowTable data={data} getData={getData} baseURL={baseURL}></ShowTable>
      <div>
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page <= 1}
        >
          Prev
        </button>
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page > Math.floor(data.length / 5)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
