import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface System {
  id: string;
  name: string;
  batteriesCount: number;
  invertersCount: number;
  exportType: string | null;
  panelsCapacity: number;
  batteriesCapacity: number;
  invertersCapacity: number;
}

export interface SystemStats {
  totalSystemsCount: number;
  hybridWithBatteries: number;
  hybridWithoutBatteries: number;
  onGrid: number;
}

const GET_ALL_SYSTEMS = gql`
  query GetAllSystems {
    allSystems {
      id
      name
      batteriesCount
      invertersCount
      exportType
      panelsCapacity
      batteriesCapacity
      invertersCapacity
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  private readonly TOKEN = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3OTEyOTA4NTIsImxhbmd1YWdlIjpudWxsLCJyb2xlIjoiTk9DIiwic3ViIjoiMmMyYTI2NzAtNTFkZi00NGUxLWFmOTgtZTdlODdhN2RkZjY4IiwidHoiOjAsInV0IjowfQ.WxS8kw_4x48TNIHIimK9DnjxSQYxS-V_AjuqnolcmQi33d9QkFG1xsMF6pzLwMXW_Z96xtSifx-xbOypkQyuGg';
  
  constructor(private apollo: Apollo) {}

  getSystemStats(userId: string): Observable<SystemStats> {
    return this.apollo
      .query<{ allSystems: System[] }>({
        query: GET_ALL_SYSTEMS,
        context: {
          headers: {
            'Authorization': `Bearer ${this.TOKEN}`
          }
        }
      })
      .pipe(
        map(result => {
          const allSystems = result.data.allSystems;
          return this.calculateStats(allSystems);
        })
      );
  }

  private calculateStats(systems: System[]): SystemStats {
    const totalSystemsCount = systems.length;
    
    // Hybrid with Batteries: has both inverters and batteries
    const hybridWithBatteries = systems.filter(s => 
      s.invertersCount > 0 && s.batteriesCount > 0
    ).length;
    
    // Hybrid without Batteries: has inverters but no batteries
    const hybridWithoutBatteries = systems.filter(s => 
      s.invertersCount > 0 && s.batteriesCount === 0
    ).length;
    
    // On Grid: systems with exportType (connected to grid)
    const onGrid = systems.filter(s => 
      s.exportType !== null && s.exportType !== undefined
    ).length;
    
    return {
      totalSystemsCount,
      hybridWithBatteries,
      hybridWithoutBatteries,
      onGrid
    };
  }
}