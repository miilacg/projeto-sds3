import axios from "axios";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { SalePage } from "types/sale";
import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/request";

const DataTable = () => {
  const [activePage, setActivePage] = useState(0);

  const [page, setPage] = useState<SalePage>({
    first: true, //por padrão estamos na primeira página
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales?page=${activePage}&size=00&sort=date,desc`)
      .then(response => {
        setPage(response.data)
      });
  }, [activePage]); //sempre que o activePage mudar a busca é feita de novo


  const changePage = (index: number) => {
    setActivePage(index); //a pagina ativa vai passar a ser o index
  }

  return (
    <>
      <Pagination page={ page } onPageChange={ changePage }/>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Data</th>
              <th>Vendedor</th>
              <th>Clientes visitados</th>
              <th>Negócios fechados</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {
              page.content?.map(item => ( // se o content estiver definido
                <tr key={ item.id }>
                  <td>{ formatLocalDate(item.date, "dd/MM/yyyy") }</td>
                  <td>{ item.seller.name }</td>
                  <td>{ item.visited }</td>
                  <td>{ item.deals }</td>
                  <td>{ item.amount.toFixed(2) }</td>
                </tr>   
              ))
            }                            
          </tbody>
        </table>
      </div>
    </>        
  );
}

export default DataTable;