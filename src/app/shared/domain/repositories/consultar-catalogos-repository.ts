import { Observable } from 'rxjs';
import { Catalogo} from '../dto/catalogo';

export abstract class ConsultarCatalogosRepository {
    abstract obtenerCatalogoRoles(): Observable<Catalogo[]>

}