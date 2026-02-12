import './ClienteList.css';
import Button from '../ui/Button';


export default function ClienteList({ clientes, onEdit, onDelete, onView }) {
  if (clientes.length === 0) {
    return (
      <div className="empty fade-in">
        <img src="/img/cliente.png" alt="" className="empty__icon" />
        <h3 className="empty__titulo">Nenhum cliente encontrado</h3>
        <p className="empty__texto">Cadastre o primeiro cliente para começar</p>
      </div>
    );
  }


  return (
    <div className="cliente-list fade-in">
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Cadastro</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>
                  <button className="table__link" onClick={() => onView(cliente)}>
                    {cliente.nome}
                  </button>
                </td>
                <td className="table__sub">{cliente.email}</td>
                <td className="table__sub">{cliente.telefone}</td>
                <td className="table__sub">
                  {new Date(cliente.createdAt).toLocaleDateString('pt-BR')}
                </td>
                <td>

                  <div className="table__acoes">
                    <Button variant="icon" size="sm" onClick={() => onEdit(cliente)} title="Editar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </Button>

                    <Button variant="icon" size="sm" onClick={() => onDelete(cliente)} title="Excluir">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </Button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
