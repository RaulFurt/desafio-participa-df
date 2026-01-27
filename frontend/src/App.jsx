import FormularioManifestacao from './components/FormularioManifestacao';
import VLibras from './components/VLibras'; // Importa o bonequinho
import Acessibilidade from './components/Acessibilidade'; // Importa o menu lateral

function App() {
  return (
    <>
      <FormularioManifestacao />
      
      {/* Widgets de Acessibilidade flutuando sobre o app */}
      <VLibras />
      <Acessibilidade />
    </>
  );
}

export default App;