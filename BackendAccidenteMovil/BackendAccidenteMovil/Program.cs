using System;
using System.Collections.Generic;

namespace AppPrevencionAccidentes
{
    // Clase que define los usuarios con correo y contraseña
    public class Usuario
    {
        public string Correo { get; private set; }
        public string Contraseña { get; private set; }

        public Usuario(string correo, string contraseña)
        {
            Correo = correo;
            Contraseña = contraseña;
        }
    }

    // Clase que define los reportes de fallas viales
    public class ReporteFallaVial
    {
        public string Descripcion { get; private set; }
        public string Ubicacion { get; private set; }
        public DateTime FechaReporte { get; private set; }
        public int Prioridad { get; private set; } // 1 (Alta), 2 (Media), 3 (Baja)

        public ReporteFallaVial(string descripcion, string ubicacion, int prioridad)
        {
            Descripcion = descripcion;
            Ubicacion = ubicacion;
            FechaReporte = DateTime.Now;
            Prioridad = prioridad;
        }

        public void MostrarReporte()
        {
            Console.WriteLine($"Descripción: {Descripcion}");
            Console.WriteLine($"Ubicación: {Ubicacion}");
            Console.WriteLine($"Fecha del reporte: {FechaReporte}");
            Console.WriteLine($"Prioridad: {ObtenerPrioridadTexto()}");
        }

        private string ObtenerPrioridadTexto()
        {
            return Prioridad switch
            {
                1 => "Alta",
                2 => "Media",
                _ => "Baja"
            };
        }
    }

    // Clase de utilidades para manejar las entradas del usuario
    public static class Utilidades
    {
        public static string LeerTexto(string mensaje)
        {
            string texto;
            do
            {
                Console.WriteLine(mensaje);
                texto = Console.ReadLine();
                if (string.IsNullOrWhiteSpace(texto))
                    Console.WriteLine("El campo no puede estar vacío.");
            } while (string.IsNullOrWhiteSpace(texto));

            return texto;
        }

        public static void Pausar()
        {
            Console.WriteLine("\nPresione Enter para continuar...");
            Console.ReadLine();
        }
    }

    // Clase principal de la aplicación
    class Program
    {
        static List<ReporteFallaVial> listaReportes = new List<ReporteFallaVial>();
        static List<Usuario> listaUsuarios = new List<Usuario>();
        static Usuario usuarioActual = null;

        static void Main(string[] args)
        {
            Console.Title = "App de Prevención de Accidentes para Motociclistas";
            bool continuar = true;

            while (continuar)
            {
                if (usuarioActual == null)
                {
                    MostrarMenuAutenticacion();
                    ConsoleKeyInfo tecla = Console.ReadKey(true);
                    switch (tecla.KeyChar)
                    {
                        case '1':
                            RegistrarUsuario();
                            break;
                        case '2':
                            IniciarSesion();
                            break;
                        case '3':
                            continuar = false;
                            Console.WriteLine("\nSaliendo de la aplicación...");
                            break;
                        default:
                            Console.WriteLine("Opción no válida. Intente nuevamente.");
                            Utilidades.Pausar();
                            break;
                    }
                }
                else
                {
                    MostrarMenuPrincipal();
                    ConsoleKeyInfo tecla = Console.ReadKey(true);
                    switch (tecla.KeyChar)
                    {
                        case '1':
                            IniciarReporteFallaVial();
                            break;
                        case '2':
                            VerReportesRecientes();
                            break;
                        case '3':
                            usuarioActual = null;
                            Console.WriteLine("\nCerrando sesión...");
                            Utilidades.Pausar();
                            break;
                        default:
                            Console.WriteLine("Opción no válida. Intente nuevamente.");
                            Utilidades.Pausar();
                            break;
                    }
                }
            }
        }

        // Menú de autenticación
        static void MostrarMenuAutenticacion()
        {
            Console.Clear();
            Console.WriteLine("╔═══════════════════════════════════════════════════╗");
            Console.WriteLine("║        Bienvenido a la App de Prevención de       ║");
            Console.WriteLine("║          Accidentes para Motociclistas            ║");
            Console.WriteLine("╚═══════════════════════════════════════════════════╝");
            Console.WriteLine("\n1. Registrar Usuario");
            Console.WriteLine("2. Iniciar Sesión");
            Console.WriteLine("3. Salir\n");
            Console.WriteLine("Ingrese su elección y presione Enter:");
        }

        // Registro de nuevo usuario
        static void RegistrarUsuario()
        {
            Console.Clear();
            string correo = Utilidades.LeerTexto("Ingrese su correo electrónico:");
            string contraseña = Utilidades.LeerTexto("Ingrese su contraseña:");

            listaUsuarios.Add(new Usuario(correo, contraseña));
            Console.WriteLine("\nUsuario registrado exitosamente.");
            Utilidades.Pausar();
        }

        // Inicio de sesión
        static void IniciarSesion()
        {
            Console.Clear();
            string correo = Utilidades.LeerTexto("Ingrese su correo electrónico:");
            string contraseña = Utilidades.LeerTexto("Ingrese su contraseña:");

            foreach (var usuario in listaUsuarios)
            {
                if (usuario.Correo == correo && usuario.Contraseña == contraseña)
                {
                    usuarioActual = usuario;
                    Console.WriteLine("\nInicio de sesión exitoso.");
                    Utilidades.Pausar();
                    return;
                }
            }

            Console.WriteLine("\nCredenciales incorrectas. Intente nuevamente.");
            Utilidades.Pausar();
        }

        // Menú principal de la aplicación
        static void MostrarMenuPrincipal()
        {
            Console.Clear();
            Console.WriteLine("╔═══════════════════════════════════════════════════╗");
            Console.WriteLine("║        Bienvenido a la App de Prevención de       ║");
            Console.WriteLine("║          Accidentes para Motociclistas            ║");
            Console.WriteLine("╚═══════════════════════════════════════════════════╝");
            Console.WriteLine("\nSeleccione una opción presionando el número correspondiente:\n");
            Console.WriteLine("   1. Iniciar reporte de falla vial");
            Console.WriteLine("   2. Ver reportes recientes");
            Console.WriteLine("   3. Cerrar sesión\n");
            Console.WriteLine("Ingrese su elección y presione Enter:");
        }

        // Método para iniciar el reporte de una nueva falla vial
        static void IniciarReporteFallaVial()
        {
            Console.Clear();
            Console.WriteLine("Seleccione el tipo de peligro en la vía:");
            Console.WriteLine("1. Huecos");
            Console.WriteLine("2. Derrame de aceite");
            Console.WriteLine("3. Material peligroso");
            Console.WriteLine("4. Animales en la vía");
            Console.WriteLine("5. Obstáculos inesperados");
            Console.WriteLine("6. Falta de señalización");
            Console.WriteLine("7. Semáforos fuera de servicio");
            Console.WriteLine("8. Mala iluminación");
            Console.WriteLine("9. Charcos de agua");
            Console.WriteLine("0. Otros");

            int opcion = LeerOpcionTecla('1', '2', '3', '4', '5', '6', '7', '8', '9', '0');
            string descripcion = opcion switch
            {
                1 => "Huecos",
                2 => "Derrame de aceite",
                3 => "Material peligroso",
                4 => "Animales en la vía",
                5 => "Obstáculos inesperados",
                6 => "Falta de señalización",
                7 => "Semáforos fuera de servicio",
                8 => "Mala iluminación",
                9 => "Charcos de agua",
                0 => Utilidades.LeerTexto("Ingrese una descripción personalizada del peligro:"),
                _ => "Otros"
            };

            string ubicacion = Utilidades.LeerTexto("Ingrese la ubicación de la falla:");
            Console.WriteLine("Establezca la prioridad de la falla (1 = Alta, 2 = Media, 3 = Baja):");
            int prioridad = LeerOpcionTecla('1', '2', '3');

            ReporteFallaVial nuevoReporte = new ReporteFallaVial(descripcion, ubicacion, prioridad);
            listaReportes.Add(nuevoReporte);

            Console.WriteLine("\nFalla vial reportada exitosamente.");
            Utilidades.Pausar();
        }

        // Método para mostrar los reportes recientes de fallas viales
        static void VerReportesRecientes()
        {
            Console.Clear();
            Console.WriteLine("╔═══════════════════════════════════════════════════╗");
            Console.WriteLine("║            Reportes de Fallas Viales              ║");
            Console.WriteLine("╚═══════════════════════════════════════════════════╝\n");

            if (listaReportes.Count == 0)
            {
                Console.WriteLine("No hay reportes para mostrar.");
                Utilidades.Pausar();
                return;
            }

            listaReportes.Sort((a, b) => a.Prioridad.CompareTo(b.Prioridad));

            foreach (var reporte in listaReportes)
            {
                reporte.MostrarReporte();
                Console.WriteLine("-------------");
            }

            Utilidades.Pausar();
        }

        // Método para capturar opciones sin necesidad de Enter
        static int LeerOpcionTecla(params char[] opcionesValidas)
        {
            while (true)
            {
                ConsoleKeyInfo tecla = Console.ReadKey(true);
                char opcion = tecla.KeyChar;

                foreach (char valida in opcionesValidas)
                {
                    if (opcion == valida)
                    {
                        return int.Parse(opcion.ToString());
                    }
                }
                Console.WriteLine("Opción no válida. Intente nuevamente.");
            }
        }
    }
}
