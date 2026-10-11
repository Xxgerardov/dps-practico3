 import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import {
  Searchbar,
  Chip,
  SegmentedButtons,
  Text,
  ActivityIndicator,
  Button,
  Snackbar,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { obtenerRecursos, calificarRecurso } from "../services/recursosService";
import { obtenerFavoritos, alternarFavorito } from "../services/favoritosService";
import { obtenerCalificacionUsuario } from "../utils/calificaciones";
import TarjetaRecurso from "../components/TarjetaRecurso";

export default function ListaRecursosScreen({ route }) {
  const { usuario } = useAuth();
  const esEstudiante = usuario.rol === "estudiante";
  const soloFavoritos = route?.params?.soloFavoritos === true;

  const [recursos, setRecursos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [campo, setCampo] = useState("todo");
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [orden, setOrden] = useState("az");

  const cargar = async () => {
    try {
      setError("");
      const datos = await obtenerRecursos();
      setRecursos(datos);
      if (esEstudiante) {
        setFavoritos(await obtenerFavoritos(usuario.id));
      }
    } catch (e) {
      setError("No se pudieron cargar los recursos");
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [])
  );

  const refrescar = () => {
    setRefrescando(true);
    cargar();
  };

  const alternarFav = async (recurso) => {
    const nuevos = await alternarFavorito(usuario.id, recurso.id);
    setFavoritos(nuevos);
    setMensaje(
      nuevos.includes(String(recurso.id))
        ? "Agregado a favoritos"
        : "Quitado de favoritos"
    );
  };

  const calificar = async (recurso, valor) => {
    try {
      const actualizado = await calificarRecurso(recurso.id, usuario.id, valor);
      setRecursos((actuales) =>
        actuales.map((r) => (r.id === actualizado.id ? actualizado : r))
      );
      setMensaje("Tu calificación fue registrada");
    } catch (e) {
      setMensaje("No se pudo guardar la calificación");
    }
  };

  const base = useMemo(
    () =>
      soloFavoritos
        ? recursos.filter((r) => favoritos.includes(String(r.id)))
        : recursos,
    [recursos, favoritos, soloFavoritos]
  );

  const tipos = useMemo(
    () => ["todos", ...new Set(base.map((r) => r.tipo).filter(Boolean))],
    [base]
  );

  const resultados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    const filtrados = base.filter((r) => {
      if (tipoFiltro !== "todos" && r.tipo !== tipoFiltro) return false;
      if (!texto) return true;
      const id = String(r.id);
      const titulo = (r.titulo || "").toLowerCase();
      const tipo = (r.tipo || "").toLowerCase();
      if (campo === "id") return id === texto;
      if (campo === "titulo") return titulo.includes(texto);
      if (campo === "tipo") return tipo.includes(texto);
      return id === texto || titulo.includes(texto) || tipo.includes(texto);
    });

    return [...filtrados].sort((a, b) => {
      if (orden === "tipo") return (a.tipo || "").localeCompare(b.tipo || "");
      const comparacion = (a.titulo || "").localeCompare(b.titulo || "");
      return orden === "za" ? -comparacion : comparacion;
    });
  }, [base, busqueda, campo, tipoFiltro, orden]);

  const encabezado = (
    <View style={estilos.encabezado}>
      {soloFavoritos && (
        <Text variant="headlineSmall" style={estilos.titulo}>
          Mis favoritos
        </Text>
      )}
      <Searchbar
        placeholder="Buscar recursos"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <Text variant="labelLarge">Buscar por</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          { valor: "todo", etiqueta: "Todo" },
          { valor: "id", etiqueta: "ID" },
          { valor: "titulo", etiqueta: "Título" },
          { valor: "tipo", etiqueta: "Tipo" },
        ].map((c) => (
          <Chip
            key={c.valor}
            selected={campo === c.valor}
            onPress={() => setCampo(c.valor)}
            style={estilos.chipFiltro}
          >
            {c.etiqueta}
          </Chip>
        ))}
      </ScrollView>

      <Text variant="labelLarge">Filtrar por tipo</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tipos.map((t) => (
          <Chip
            key={t}
            selected={tipoFiltro === t}
            onPress={() => setTipoFiltro(t)}
            style={estilos.chipFiltro}
          >
            {t === "todos" ? "Todos" : t}
          </Chip>
        ))}
      </ScrollView>

      <Text variant="labelLarge">Ordenar</Text>
      <SegmentedButtons
        value={orden}
        onValueChange={setOrden}
        buttons={[
          { value: "az", label: "A-Z" },
          { value: "za", label: "Z-A" },
          { value: "tipo", label: "Tipo" },
        ]}
      />
    </View>
  );

  if (cargando) {
    return (
      <SafeAreaView style={estilos.centro}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={estilos.centro}>
        <Text style={estilos.mensaje}>{error}</Text>
        <Button mode="contained" onPress={cargar}>
          Reintentar
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.contenedor} edges={["top"]}>
      <FlatList
        data={resultados}
        extraData={favoritos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TarjetaRecurso
            recurso={item}
            esFavorito={
              esEstudiante ? favoritos.includes(String(item.id)) : undefined
            }
            onFavorito={esEstudiante ? () => alternarFav(item) : undefined}
            miCalificacion={
              esEstudiante
                ? obtenerCalificacionUsuario(item.calificaciones, usuario.id)
                : undefined
            }
            onCalificar={
              esEstudiante ? (valor) => calificar(item, valor) : undefined
            }
          />
        )}
        ListHeaderComponent={encabezado}
        ListEmptyComponent={
          <Text style={estilos.mensaje}>
            {soloFavoritos
              ? "Aún no tienes recursos favoritos"
              : "No se encontraron recursos"}
          </Text>
        }
        contentContainerStyle={estilos.lista}
        refreshControl={
          <RefreshControl refreshing={refrescando} onRefresh={refrescar} />
        }
      />
      <Snackbar
        visible={mensaje !== ""}
        onDismiss={() => setMensaje("")}
        duration={2000}
      >
        {mensaje}
      </Snackbar>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
 contenedor: { flex: 1 },
  lista: { padding: 16 },
  encabezado: { gap: 8, marginBottom: 16 },
  titulo: { fontWeight: "bold" },
  chipFiltro: { marginRight: 8 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
  mensaje: { textAlign: "center", marginVertical: 24 },
});