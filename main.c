/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jslave <jslave@student.21-school.ru>       +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/07/15 18:59:35 by jslave            #+#    #+#             */
/*   Updated: 2020/07/15 18:59:35 by jslave           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "lemin.h"

t_lem_in	*ft_init_lem_in(void)
{
	t_lem_in	*lemin;

	if (!(lemin = (t_lem_in *)ft_memalloc(sizeof(t_lem_in))))
        raise_error(0);
	lemin->ants = 0;
	lemin->commands = (char**)malloc(sizeof(char*) * 10);
	lemin->comments = (char**)malloc(sizeof(char*) * 10);
	lemin->rooms = NULL;
	lemin->cmd = 0;
	lemin->cmt = 0;
	lemin->ants = NULL;
	lemin->matrix = NULL;
	return (lemin);

}

int main(int argc, char **argv)

{
	char		*line;
	t_lem_in	*lem_in;
    char *line_result;
    int lines;
    t_parsed_room  **rooms_array;

    lines = 0;
    line_result = ft_strnew(1);
	while ((get_next_line(0, &line)) > 0)
	{
	    line = ft_strjoinfree_both(line,ft_strdup( "\n"));
	    line_result = ft_strjoinfree_both(line_result, line);
        lines++;
	}
    char **array_for_validity_check = ft_strsplit(line_result,'\n');
    ft_memdel((void **) &line_result);
    rooms_array = check_validity_of_input_data(array_for_validity_check, lines);
    free_parsing_structs(rooms_array, NULL, NULL);//DELETE later but freee rooms by this func only
    // lem_in = ft_init_lem_in();
    //if(!get_solution(lem_in, rooms_array))
    //    raise_error(3);

    return 0;
}