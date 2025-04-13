DROP VIEW vista_tipo_json;
CREATE VIEW vista_tipo_json AS

SELECT
    con.id,
    con.poster,
    con.titulo,
    cat.categoria, 
    (SELECT GROUP_CONCAT(gen.genero SEPARATOR ', ')
        FROM generos gen
        JOIN contenidogeneros cg ON gen.id = cg.generoId
        WHERE cg.contenidoId = con.id) AS genero,
	(SELECT GROUP_CONCAT(act.nombre SEPARATOR ', ')
    FROM actores act
    JOIN contenidoactores ca ON act.id = ca.actoreId
    WHERE ca.contenidoId = con.id) AS reparto,
    con.resumen,
    con.temporadas,
    con.trailer
FROM
    contenido con
JOIN
    categorias cat ON con.categoriaId = cat.id
ORDER BY
    con.id, con.poster, con.titulo, cat.categoria, con.resumen, con.temporadas, con.trailer;
SELECT * from vista_tipo_json;